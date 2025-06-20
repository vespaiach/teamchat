declare global {
  interface AppError {
    id: string;
    message: string;
    location?: string;
  }
  
  var appErrors: AppError[] | undefined;
}

export {}