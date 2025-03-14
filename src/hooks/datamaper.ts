export interface ApiResponse {
  result: boolean;
  NSR: number;
  time: string;
  day: string;
  "batidas.52364": {
    day: string;
    time: string;
  };
  batidas_dia: string[];
  nome: string;
  employee: {
    _id: string;
  };
  only_location: boolean;
  photo_on_punch: boolean;
  activity_on_punch: boolean;
  justification_permissions: {
    read_write_attach: boolean;
    add_absence: boolean;
    add_punch: boolean;
  };
  face_id_on_punch: boolean;
}

export const isValidApiResponse = (data: unknown): data is ApiResponse => {
  if (!data || typeof data !== "object" || data === null) return false;

  const response = data as Partial<ApiResponse>;

  if (typeof response.result !== "boolean") return false;
  if (typeof response.NSR !== "number") return false;
  if (typeof response.time !== "string") return false;
  if (typeof response.day !== "string") return false;
  if (typeof response.nome !== "string") return false;
  if (!Array.isArray(response.batidas_dia)) return false;

  const batidas = response["batidas.52364"];
  if (
    !batidas ||
    typeof batidas !== "object" ||
    typeof batidas.day !== "string" ||
    typeof batidas.time !== "string"
  )
    return false;

  const employee = response.employee;
  if (
    !employee ||
    typeof employee !== "object" ||
    typeof employee._id !== "string"
  )
    return false;

  const permissions = response.justification_permissions;
  if (
    !permissions ||
    typeof permissions !== "object" ||
    typeof permissions.read_write_attach !== "boolean" ||
    typeof permissions.add_absence !== "boolean" ||
    typeof permissions.add_punch !== "boolean"
  )
    return false;

  if (typeof response.only_location !== "boolean") return false;
  if (typeof response.photo_on_punch !== "boolean") return false;
  if (typeof response.activity_on_punch !== "boolean") return false;
  if (typeof response.face_id_on_punch !== "boolean") return false;

  return true;
};

export const mapApiResponseToBatidas = (data: ApiResponse): string[] => {
  return data.batidas_dia;
};
