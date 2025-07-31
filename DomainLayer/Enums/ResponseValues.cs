using System;

namespace DomainLayer.Enums
{
    public static class ResponseValues
    {
        //   General Success
        public const string Saved = "Record added successfully";
        public const string Updated = "Record updated successfully";
        public const string Deleted = "Record deleted successfully";
        public const string Success = "Operation completed successfully";
        public const string DataNotFound = "Data not found against this Id";

        //   General Errors
        public const string Error = "Something went wrong";
        public const string InternalServer = "Internal server error occurred";
        public const string NotFound = "Record not found";
        public const string AlreadyExist = "Record already exists";

        //   Validation & Input
        public const string InvalidInput = "Invalid input provided";
        public const string MissingRequiredFields = "Required fields are missing";
        public const string InvalidRequest = "Invalid request data";
        public const string ValidationFailed = "Validation failed";

        //   Authentication & Authorization
        public const string LoginSuccess = "Logged in successfully";
        public const string WrongPassword = "Incorrect password";
        public const string UserNotFound = "User not found with provided credentials";
        public const string UserAlreadyExist = "User already exists with this email";
        public const string UnAuthorized = "Unauthorized user";
        public const string Forbidden = "Access is forbidden for this user";

        //   Token & Session
        public const string TokenExpired = "Session expired. Please login again";
        public const string InvalidToken = "Invalid token";
        public const string TokenGenerated = "Token generated successfully";

        //   File/Upload
        public const string FileUploadSuccess = "File uploaded successfully";
        public const string FileUploadFailed = "File upload failed";
        public const string FileNotFound = "File not found";

        //   Email / Notifications
        public const string EmailSent = "Email sent successfully";
        public const string EmailFailed = "Failed to send email";

        //   Roles / Permissions
        public const string RoleNotPermitted = "Your role does not have permission for this action";
        public const string RoleMismatch = "User role mismatch";

        //   User Status
        public const string UserActivated = "User activated successfully";
        public const string UserDeactivated = "User deactivated successfully";

        //   Job Status
        public const string JobActivated = "Job activated successfully";
        public const string JobDeactivated = "Job deactivated successfully";

        //   Generic
        public const string StatusUpdated = "Status updated successfully";
        public const string PartialUpdate = "Partial update completed successfully";
    }
}
