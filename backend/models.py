'''
L Dettling
CIS 658

Sources: 
https://www.atlassian.com/data/notebook/how-to-execute-raw-sql-in-sqlalchemy
https://www.youtube.com/watch?v=YpvcqxYiyNE
https://www.youtube.com/watch?v=0A_GCXBCNUQ
https://www.youtube.com/watch?v=HpWANiK0fBo

'''

from sqlalchemy import Column, Integer, String, Sequence
from database import Base
from database import engine
from pydantic import BaseModel


class User(Base):
    __tablename__ = "users"
    __table_args__ = {'schema': 'ADMIN'}  

    id = Column(Integer, Sequence('USER_ID_SEQ', start=1, increment=1), primary_key=True)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)



class UserProfile(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True
