import { useState, useEffect } from "react";
import { UsersAPI } from "../api/users";
import { RolesAPI } from "../api/roles";
import type {
  User,
  CreateUserData,
  UpdateUserData,
  Role,
} from "../types/users";

import { Plus, Pencil, Trash2, X } from "lucide-react";
