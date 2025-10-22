# users/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import ValidationError
from .models import User,Role,AffiliatedOrganization
from .serializers import RegisterSerializer, MyTokenObtainSerializer, UserReadSerializer,ApproveUserSerializer,RoleSerializer,AffiliatedOrgSerializer

def get_first_error_message(errors):
    if isinstance(errors, dict):
        for field, messages in errors.items():
            if isinstance(messages, list) and messages:
                return str(messages[0])
            elif isinstance(messages, str):
                return messages
    elif isinstance(errors, list) and errors:
        return str(errors[0])
    return "Invalid input."

# Registration API
class RegisterView(generics.CreateAPIView):
    """
    Register a new user.
    Expects: name, email, phone_number, password, confirm_password, role, affiliated_org
    """
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role.name if user.role else None,
            "affiliated_org_id": user.affiliated_org.id if user.affiliated_org else None,
            "affiliated_org_name": user.affiliated_org.name if user.affiliated_org else None,
        }, status=status.HTTP_201_CREATED)


# Login API using JWT
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            message = get_first_error_message(e.detail)
            return Response({"message": message},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
# List all non-admin users (role="Admin" only)
class NonAdminUserListView(generics.ListAPIView):
    serializer_class = UserReadSerializer

    def get_queryset(self):
        # Exclude users with is_admin=True
        return User.objects.filter(is_admin=False)

    def get(self, request, *args, **kwargs):
        # Role check
        if not request.user.role or request.user.role.name.lower() != "admin":
            return Response(
                {"detail": "You do not have permission to access this."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return super().get(request, *args, **kwargs)


# Retrieve single non-admin user by ID (role="Admin" only)
class NonAdminUserDetailView(generics.RetrieveAPIView):
    serializer_class = UserReadSerializer

    def get_queryset(self):
        return User.objects.filter(is_admin=False)

    def get(self, request, *args, **kwargs):
        # Role check
        if not request.user.role or request.user.role.name.lower() != "admin":
            return Response(
                {"detail": "You do not have permission to access this."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return super().get(request, *args, **kwargs)
    
#approve_usersview
class ApproveUserView(generics.UpdateAPIView):
    serializer_class = ApproveUserSerializer
    queryset = User.objects.filter(is_admin=False)  # only non-admin users

    def patch(self, request, *args, **kwargs):
        # Check role of the requesting user
        if not request.user.role or request.user.role.name.lower() != "admin":
            return Response(
                {"detail": "You do not have permission to approve users."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return super().patch(request, *args, **kwargs)
    
class RolesView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class AffiliatedOrganizationView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AffiliatedOrganization.objects.all()
    serializer_class = AffiliatedOrgSerializer