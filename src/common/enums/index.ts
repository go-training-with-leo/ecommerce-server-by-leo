enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

enum Role {
  ADMIN = 0,
  USER = 1,
}

enum Action {
  RESET_PASSWORD = 0,
}

enum CodeStatus {
  IS_CREATED = 0,
  IS_VERIFIED = 1,
  IS_USED = 2,
}

export { Role, Gender, Action, CodeStatus };
