export type ApiResponse<T> = {
    success: boolean,
    message?: string,
    data?: T,
    total_count?: number
}