enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

enum Role {
  USER = 0,
  ADMIN = 1,
}

enum CodeAction {
  RESET_PASSWORD = 0,
}

enum CodeStatus {
  IS_CREATED = 0,
  IS_VERIFIED = 1,
  IS_USED = 2,
}

export { Role, Gender, CodeAction, CodeStatus };
