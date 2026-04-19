from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Create connection to SQLite database
# This will create a file called database.db in the project folder
engine = create_engine("sqlite:///database.db", echo=True)

# Base class for all database models (tables)
Base = declarative_base()

# Define the Race table
class Race(Base):
    __tablename__ = "races"  # Name of the table in the database

    # Primary key (unique identifier for each race)
    id = Column(Integer, primary_key=True)

    # Basic race information
    name = Column(String)
    location = Column(String)
    date = Column(String)

# Create a session to interact with the database
# This is used to add, update, delete data later
Session = sessionmaker(bind=engine)
session = Session()

# TEMPORARY: Create tables in the database
# Run this (Base.metadata.create_all(engine)) once, then this line is deleted
Base.metadata.create_all(engine)