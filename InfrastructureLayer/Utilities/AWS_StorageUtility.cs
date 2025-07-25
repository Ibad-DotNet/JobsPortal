using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Amazon.S3;
using Amazon;
using Microsoft.Extensions.Configuration;

namespace InfrastructureLayer.Utilities
{
    public class AWS_StorageUtility
    {
        private static string _accessKey;
        private static string _secretKey;
        private static string _region;
        private static string _bucketName;

        public static void Configure(IConfiguration config)
        {
            _accessKey = config["AWS:AccessKey"];
            _secretKey = config["AWS:SecretKey"];
            _region = config["AWS:Region"];
            _bucketName = config["AWS:BucketName"];
        }

        public static async Task<string> UploadBase64PdfAsync(string base64String, string fileName)
        {
            try
            {

                var bytes = Convert.FromBase64String(base64String);

                using var client = new AmazonS3Client(_accessKey, _secretKey, RegionEndpoint.GetBySystemName(_region));
                using var stream = new MemoryStream(bytes);

                var request = new PutObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileName,
                    InputStream = stream,
                    ContentType = "application/pdf"
                };

                await client.PutObjectAsync(request);

                return $"https://{_bucketName}.s3.{_region}.amazonaws.com/{fileName}";
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading PDF to AWS S3: {ex.Message}", ex);
            }
        }
        public static async Task<bool> DeleteFileAsync(string fileName)
        {
            try
            {
                using var client = new AmazonS3Client(_accessKey, _secretKey, RegionEndpoint.GetBySystemName(_region));

                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileName
                };

                var response = await client.DeleteObjectAsync(deleteRequest);
                return response.HttpStatusCode == System.Net.HttpStatusCode.NoContent;
            }
            catch (AmazonS3Exception ex)
            {
                throw new Exception($"AWS S3 error deleting file: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting file from AWS S3: {ex.Message}", ex);
            }
        }

    }
}
