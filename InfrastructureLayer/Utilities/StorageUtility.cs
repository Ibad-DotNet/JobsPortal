using System.Net;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;

namespace InfrastructureLayer.Utilities
{
    public static class StorageUtility
    {

        public static async Task<string> UploadImageBase64Async(string fileName, string base64Image, IConfiguration config)
        {
            // Validate image file extension
            string[] allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" };
            string ext = Path.GetExtension(fileName).ToLowerInvariant();

            if (Array.IndexOf(allowedExtensions, ext) == -1)
                throw new InvalidOperationException("Only image files are allowed (jpg, jpeg, png, gif, bmp, webp).");

            // Decode base64
            byte[] imageBytes = Convert.FromBase64String(base64Image);
            using var stream = new MemoryStream(imageBytes);

            // Set up Cloudinary
            Cloudinary cloudinary = new Cloudinary(config["CLOUDINARY_URL"]);
            cloudinary.Api.Secure = true;

            // Prepare upload params
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, stream),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true,
                Folder = "image_uploads",          // optional folder
                AccessMode = "public"              // ensure public access
            };

            // Upload
            ImageUploadResult uploadResult = await cloudinary.UploadAsync(uploadParams);

            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.ToString(); // public URL
            }

            throw new Exception("Image upload failed: " + uploadResult.Error?.Message);
        }
    }
}
