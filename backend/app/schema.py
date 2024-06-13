import graphene
import profiles.schema
import records.schema

class Query(profiles.schema.Query, records.schema.Query, graphene.ObjectType):
    pass

class Mutation(profiles.schema.Mutation, records.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)

