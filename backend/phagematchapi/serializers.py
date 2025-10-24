# users/serializers.py
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Role, AffiliatedOrganization

# Role serializer
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

# Affiliated Organization serializer
class AffiliatedOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffiliatedOrganization
        fields = '__all__'

# Registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    is_admin = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone_number', 'password', 'confirm_password', 'role', 'affiliated_org', 'is_admin']

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # hashes password
        user.is_active = True
        
        if validated_data.get('role') and validated_data['role'].name.lower() == "admin":
            user.is_admin = True

        user.save()
        return user

# JWT serializer without @classmethod
class MyTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # If user is not admin, check is_approved
        if not self.user.is_admin and not self.user.is_approved:
            raise serializers.ValidationError("Your account is not approved yet.")  
        
        # Add custom user info to response
        data['user'] = {
            "id": self.user.id,
            "name": self.user.name,
            "email": self.user.email,
            "role": self.user.role.name if self.user.role else None,
            "role_slug": self.user.role.role_slug if self.user.role else None,
            "is_admin": self.user.is_admin,
            "is_approved": self.user.is_approved,
            "affiliated_org_id": self.user.affiliated_org.id if self.user.affiliated_org else None,
            "affiliated_org_name": self.user.affiliated_org.name if self.user.affiliated_org else None,
        }
        return data

# getusers_serializers
class UserReadSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    affiliated_org_name = serializers.CharField(source='affiliated_org.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone_number', 'role_name', 'affiliated_org_name', 'is_approved', 'is_admin']

#approve_users
class ApproveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_approved']