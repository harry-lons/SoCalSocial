import uuid
from typing import List

from pydantic import BaseModel


class ClubID(BaseModel):
    id: str


class Club(ClubID):
    # id: int
    name: str
    contact_email: str


class UserID(BaseModel):
    id: str


class UserIDList(BaseModel):
    users: List[str]


class User(UserID):
    # id: int
    username: str
    first_name: str
    last_name: str


class UserList(BaseModel):
    users: List[User]


class UserAndClubs(User):
    # list of club ids
    followed_clubs: List[ClubID]


class ClubWithBoardMembers(Club):
    board_members: List[User]  # List of UserIDs
    description: str


class UserProfilePictureImgKey(BaseModel):
    key: str


class AllClubs(BaseModel):
    clubs: List[ClubWithBoardMembers]
