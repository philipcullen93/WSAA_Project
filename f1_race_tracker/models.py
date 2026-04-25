from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

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

    # One race can have many results
    results = relationship("Result", back_populates="race", cascade="all, delete")


# Result table
class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True)

    # Links this result to a race
    race_id = Column(Integer, ForeignKey("races.id"))

    driver_name = Column(String)
    position = Column(Integer)
    points = Column(Integer)

    # Connects this result back to the Race table
    race = relationship("Race", back_populates="results")


# Session used to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# TEMPORARY: Create tables in the database
# Run this (Base.metadata.create_all(engine)) once, then this line is deleted
# Base.metadata.create_all(engine)