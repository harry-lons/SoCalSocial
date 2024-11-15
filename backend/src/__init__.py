import os

from dotenv import dotenv_values, load_dotenv

# ENV stores all environment variables. We do this to import all environment variables
# in a centralized place, without having typing errors (such as with load_dotenv)
ENV = {
    **dotenv_values(".env"),
    **os.environ,  # override loaded values with environment variables, if they are present
}
