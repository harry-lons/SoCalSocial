from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Accounts(Base):
    __tablename__ = "accounts"

    id = Column(String, primary_key=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    account_type = Column(String, nullable=False)
    profile_picture = Column(String, nullable=False)

    # One-to-one relationship with UserAccounts, ClubAccounts, and Objects
    user_account = relationship("UserAccounts", back_populates="account", uselist=False)
    club_account = relationship("ClubAccounts", back_populates="account", uselist=False)


class UserAccounts(Base):
    __tablename__ = "user_accounts"

    id = Column(String, ForeignKey("accounts.id"), primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    # Relationship back to Accounts
    account = relationship("Accounts", back_populates="user_account")

    # Many-to-many relationship with Events (RSVPs)
    events = relationship("Events", secondary="user_rsvps", back_populates="attendees")

    # Many-to-many relationship with ClubAccounts (Board members)
    clubs = relationship(
        "ClubAccounts", secondary="club_board_members", back_populates="members"
    )


class ClubAccounts(Base):
    __tablename__ = "club_accounts"

    id = Column(String, ForeignKey("accounts.id"), primary_key=True)
    name = Column(String, nullable=False)

    # Each ClubAccount has an Account
    account = relationship("Accounts", back_populates="club_account")

    # Has many Events
    events = relationship("Events", back_populates="club")

    # Many-to-many relationship with UserAccounts (Board members)
    members = relationship(
        "UserAccounts", secondary="club_board_members", back_populates="clubs"
    )


class Events(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    club_id = Column(String, ForeignKey("club_accounts.id"), nullable=False)
    location = Column(String, nullable=False)
    begin_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    summary = Column(String, nullable=True)
    recurrence = Column(String, nullable=True)

    # Relationship back to ClubAccounts
    club = relationship("ClubAccounts", back_populates="events")

    # Many-to-many relationship with EventTags
    tags = relationship(
        "EventTags", secondary="event_tag_associations", back_populates="events"
    )

    # Many-to-many relationship with UserAccounts (RSVPs)
    attendees = relationship(
        "UserAccounts", secondary="user_rsvps", back_populates="events"
    )

    # one-to-many relationship with images
    images = relationship("EventImages", back_populates="event")


class EventTags(Base):
    __tablename__ = "event_tags"

    tag_id = Column(Integer, primary_key=True, autoincrement=True)
    tag_name = Column(String, nullable=False)

    # Many-to-many relationship with Events
    events = relationship(
        "Events", secondary="event_tag_associations", back_populates="tags"
    )


# *******************************************
# Association Tables


class UserRSVPs(Base):
    __tablename__ = "user_rsvps"

    user_id = Column(String, ForeignKey("user_accounts.id"), primary_key=True)
    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)


# Association table for Board Members of ClubAccounts
class ClubBoardMembers(Base):
    __tablename__ = "club_board_members"

    user_id = Column(String, ForeignKey("user_accounts.id"), primary_key=True)
    club_id = Column(String, ForeignKey("club_accounts.id"), primary_key=True)


# Association table for Event-Tag associations
class EventTagAssociations(Base):
    __tablename__ = "event_tag_associations"

    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey(EventTags.tag_id), primary_key=True)


# Association table for Event-Image associations
class EventImages(Base):
    __tablename__ = "event_images"

    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    object_id = Column(String)

    event = relationship("Events", back_populates="images")