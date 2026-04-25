from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Connect to the SQLite database file
engine = create_engine("sqlite:///database.db", echo=True)

# Base class for database models
Base = declarative_base()


# Race table
class Race(Base):
    __tablename__ = "races"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    location = Column(String)
    date = Column(String)


# Session used to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# TEMPORARY: Create tables in the database
# Run this (Base.metadata.create_all(engine)) once, then this line is deleted
Base.metadata.create_all(engine)