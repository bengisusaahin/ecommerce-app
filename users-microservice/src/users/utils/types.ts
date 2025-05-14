export const USER_PATTERNS = {
    FindAll: 'Users.FindAll',
    FindOne: 'Users.FindOne',
    FindByEmail: 'Users.FindByEmail',
    Create: 'Users.Create',
    Update: 'Users.Update',
    Remove: 'Users.Remove',
};

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
  GUEST = "GUEST"
}