enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

enum Role {
  CUSTOMER = 0,
  ADMIN = 1,
}

enum CodeAction {
  RESET_PASSWORD = 0,
  DISCOUNT = 1,
}

enum CodeStatus {
  IS_CREATED = 0,
  IS_VERIFIED = 1,
  IS_USED = 2,
}

enum Size {
  FREE_SIZE = 0,
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
  XXL = 6,
  XXXL = 7,
}

export { Role, Size, Gender, CodeAction, CodeStatus };
