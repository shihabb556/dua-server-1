# Duas API Documentation

## Overview
This API provides endpoints to manage and retrieve categories, subcategories, and duas (prayers). It is built with Express and uses SQLite as the database.

**API Versioning:**
All endpoints are versioned under `/api/v1/`. For future changes, new versions can be added as `/api/v2/`, etc.

---

## Response Format
All endpoints return a JSON response in the following format:

```json
{
  "success": true,
  "message": "...",
  "data": ...
}
```

---

## Category Endpoints

### Get All Categories
- **URL:** `GET /api/v1/categories`
- **Response:**
  - `200 OK` with list of categories
  - `404 Not Found` if no categories
- **Response Body Example:**
```json
{
  "success": true,
  "message": "Categories Found",
  "data": [
    {
      "id": 1,
      "cat_id": 1,
      "cat_name_bn": "...",
      "cat_name_en": "...",
      "no_of_subcat": 2,
      "no_of_dua": 10,
      "cat_icon": "..."
    }
  ]
}
```

### Get Category by ID
- **URL:** `GET /api/v1/categories/:id`
- **Response:**
  - `200 OK` with category object
  - `404 Not Found` if not found

### Get Subcategories by Category ID
- **URL:** `GET /api/v1/categories/:id/subcategories`
- **Response:**
  - `200 OK` with list of subcategories
  - `404 Not Found` if not found

---

## Dua Endpoints

### Get All Duas
- **URL:** `GET /api/v1/duas`
- **Response:**
  - `200 OK` with list of duas
  - `404 Not Found` if not found

### Get Dua by ID
- **URL:** `GET /api/v1/duas/:id`
- **Response:**
  - `200 OK` with dua object
  - `404 Not Found` if not found

### Get Duas by Category ID
- **URL:** `GET /api/v1/duas/category/:id`
- **Response:**
  - `200 OK` with list of duas for the category
  - `404 Not Found` if not found

### Get Duas by Subcategory ID
- **URL:** `GET /api/v1/duas/subcategory/:id`
- **Response:**
  - `200 OK` with list of duas for the subcategory
  - `404 Not Found` if not found

---

## Type Definitions

### Category
```ts
interface Category {
  id: number;
  cat_id: number;
  cat_name_bn: string;
  cat_name_en: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}
```

### SubCategory
```ts
interface SubCategory {
  id: number;
  cat_id: number;
  subcat_id: number;
  subcat_name_bn: string;
  subcat_name_en: string;
  no_of_dua: number;
}
```

### Dua
```ts
interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_id: number;
  dua_name_bn: string;
  dua_name_en: string;
  top_bn: string;
  top_en: string;
  dua_arabic: string | null;
  dua_indopak: string | null;
  clean_arabic: string | null;
  transliteration_bn: string | null;
  transliteration_en: string | null;
  translation_bn: string | null;
  translation_en: string | null;
  bottom_bn: string | null;
  bottom_en: string | null;
  refference_bn: string | null;
  refference_en: string | null;
  audio: string | null;
}
```

### ApiResponse
```ts
export type ApiResponse<T> = {
  success: boolean,
  message?: string,
  data: T
}
```

---

## Error Handling
- All errors return a JSON response with `success: false` and an appropriate message.

---

## Notes
- All endpoints are `GET` requests.
- The API is versioned under `/api/v1/`.
- For more details, see the source code in the `src/controllers` and `src/routes` directories. 