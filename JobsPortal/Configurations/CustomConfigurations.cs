using ApplicationLayer.Interfaces;
using InfrastructureLayer.Services;

namespace JobsPortal.Configurations
{
    public static class CustomConfigurations
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<TokenServices>();
            services.AddScoped<IUser, UserServices>();
            services.AddScoped<IJob,JobServices>();
            services.AddScoped<ICandidate, CandidateService>();

            return services;
        }

    }
}
