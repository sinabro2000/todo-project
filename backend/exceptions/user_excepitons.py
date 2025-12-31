
#유저 중복 예외처리
class DuplicateUserException(Exception):
    pass

#인증 실패 예외처리
class InvalidCredentialException(Exception):
    pass