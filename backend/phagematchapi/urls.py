# users/urls.py
from django.urls import path
from .views import RegisterView, LoginView, NonAdminUserDetailView, NonAdminUserListView, ApproveUserView,RolesView, AffiliatedOrganizationView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('users/', NonAdminUserListView.as_view(), name='nonadmin-users-list'),
    path('users/<int:pk>/', NonAdminUserDetailView.as_view(), name='nonadmin-user-detail'),
    path('users/<int:pk>/approve/', ApproveUserView.as_view(), name='approve-user'),
    path('roles/', RolesView.as_view(), name='roles-list'),
    path('afforg/', AffiliatedOrganizationView.as_view(), name='affiliated-organizations-list'),
]
