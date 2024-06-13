import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from datetime import datetime
from .models import Profile

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = '__all__'

    owner = graphene.Field(UserType)

    def resolve_owner(self, info):
        return self.owner

class CreateProfile(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        birthdate = graphene.Date(required=True)
        gender = graphene.String(required=True)
        userId = graphene.ID(required=True)
    
    profile = graphene.Field(ProfileType)

    def mutate(self, info, name, birthdate, gender, userId):
        """
        The mutate function is the function that will be called when a client
        makes a request to this mutation. It takes in four arguments:
        self, info, title and content. The first two are required by all mutations;
        the last two are the arguments we defined in our CreatePostInput class.

        :param self: Access the object's attributes and methods
        :param info: Access the context of the request
        :param title: Create a new post with the title provided
        :param content: Pass the content of the post
        :param author_id: Get the author object from the database
        :return: A createpost object
        """
        owner = User.objects.get(pk=userId)
        profile = Profile(name=name, birthdate=birthdate, gender=gender, owner=owner)
        profile.save()
        return CreateProfile(profile=profile)
    
class UpdateProfile(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        birthdate = graphene.Date()
        gender = graphene.String()

    profile = graphene.Field(ProfileType)

    def mutate(self, info, id, name=None, birthdate=None, gender=None):
        try:
            profile = Profile.objects.get(pk=id)
        except Profile.DoesNotExist:
            raise Exception('Profile not found')
        
        if name is not None:
            profile.name = name
        if birthdate is not None:
            profile.birthdate = birthdate
        if gender is not None:
            profile.gender = gender
        
        profile.save()
        return UpdateProfile(profile=profile)

class DeleteProfile(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            profile = Profile.objects.get(pk=id)
        except Profile.DoesNotExist:
            raise Exception('Profile not found')
        
        profile.delete()
        return DeleteProfile(success=True)
    
class Query(graphene.ObjectType):
    profiles = graphene.List(ProfileType, userId=graphene.ID(required=True))
    user = graphene.Field(UserType, userId=graphene.ID(required=True))

    def resolve_profiles(self, info, userId):
        try:
            user = User.objects.get(pk=userId)
        except User.DoesNotExist:
            raise Exception('User not found')
        
        return Profile.objects.filter(owner=user)
    
    def resolve_user(self, info, userId):
        try:
            return User.objects.get(pk=userId)
        except User.DoesNotExist:
            raise Exception('User not found')

class Mutation(graphene.ObjectType):
    createProfile = CreateProfile.Field()
    updateProfile = UpdateProfile.Field()
    deleteProfile = DeleteProfile.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)