from datetime import datetime
from ninja import Schema

class TechnologySchema(Schema):
    name: str
    category: str

class ProjectListSchema(Schema):
    title: str
    slug: str
    summary: str
    status: str
    technologies: list[TechnologySchema]

class ProjectDetailSchema(ProjectListSchema):
    description: str
    github_url: str
    live_url: str
    created_at: datetime
