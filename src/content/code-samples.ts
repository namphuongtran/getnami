// Code shown on the site. `source` names where each sample comes from in the nami repository.
import type { CodeLang } from "@/lib/shiki";

export interface CodeSample {
  id: string;
  file: string;
  lang: CodeLang;
  caption: string;
  source: string;
  code: string;
}

export const programCs: CodeSample = {
  id: "program",
  file: "Program.cs",
  lang: "csharp",
  caption: "Compose the identity provider in your own host.",
  source: "src/Nami.Identity.Host/Program.cs, simplified",
  code: `
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddNamiIdentity(_ => { })
    .AddEntityFrameworkStores()
    .UsePostgreSQL()
    .AddMultiTenant()
    .AddKeys()
    .AddClientDefinitions(builder.Configuration.GetSection("Nami:Clients"))
    .AddScopeDefinitions(builder.Configuration.GetSection("Nami:Scopes"));

builder.Services.AddControllers();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseNamiTenancy();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
`,
};

export const appsettingsJson: CodeSample = {
  id: "appsettings",
  file: "appsettings.json",
  lang: "jsonc",
  caption: "Declare clients and scopes. Secure defaults fill in the rest.",
  source: "src/Nami.Identity.Abstractions/ClientDefinition.cs",
  code: `
{
  "Nami": {
    "Protocol": { "Issuer": "https://id.example.com/" },
    "Tenancy": { "Deployment": "Pool" },
    "Clients": [
      {
        "ClientId": "orders-web",
        "DisplayName": "Orders web app",
        "Flow": "Code", // PKCE (S256) is always required
        "RedirectUris": [ "https://orders.example.com/signin-oidc" ],
        "AllowedScopes": [ "openid", "profile", "orders.read" ],
        "AuthMethod": "PrivateKeyJwt", // the default
        "JwksJson": "<the client's public key set>"
      },
      {
        "ClientId": "billing-worker",
        "DisplayName": "Billing worker",
        "Flow": "ClientCredentials",
        "AllowedScopes": [ "orders.read" ],
        "AccessTokenType": "reference"
      }
    ],
    "Scopes": [
      { "Name": "orders.read", "DisplayName": "Read orders", "Resources": [ "orders-api" ] }
    ]
  }
}
`,
};

export const resourceApi: CodeSample = {
  id: "api",
  file: "OrdersApi/Program.cs",
  lang: "csharp",
  caption: "Protect an API with the JwtBearer handler you already use.",
  source: "docs/design/05-resource-server-validation.md",
  code: `
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.Authority = "https://acme.id.example.com/";
        options.Audience = "orders-api";
        options.TokenValidationParameters.ValidTypes = ["at+jwt"];
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.MapGet("/orders", () => Results.Ok(new[] { "A-1001", "A-1002" }))
   .RequireAuthorization();

app.Run();
`,
};

export const plannedBuilder: CodeSample = {
  id: "planned",
  file: "Program.cs (planned v1 API)",
  lang: "csharp",
  caption: "Where the builder is heading. Some calls are on the roadmap.",
  source: "docs/design/01-foundations.md section 3.4",
  code: `
builder.Services.AddNamiIdentity(o =>
    {
        o.Issuer = "https://id.example.com";
    })
    .AddEntityFrameworkStores().UsePostgreSQL()
    .AddMultiTenant()
    .AddKeys()
    .AddUsers(u => { })                                   // in progress
    .AddExternalProvider("corp-oidc", o => { /* ... */ })  // in progress
    .AddDPoP(d => d.ReplayCache.UseRedis(cfg["Redis"]))    // roadmap
    .AddEmail(m => m.UseSmtp(cfg.GetSection("Smtp")))      // roadmap
    .AddObservability();                                  // roadmap
`,
};

export const extensionPoints: CodeSample = {
  id: "extensions",
  file: "Program.cs",
  lang: "csharp",
  caption: "Swap any port with one call. These five exist today.",
  source: "src/Nami.Identity.Core/PublicAPI.Unshipped.txt",
  code: `
builder.Services.AddNamiIdentity(_ => { })
    .AddEntityFrameworkStores().UsePostgreSQL()
    .UseAuditSink<WormStorageAuditSink>()
    .UseSecurityEventSink<SiemEventSink>()
    .UseClaimsProfile<EmployeeClaimsProfile>()
    .UseKeyStore<HsmKeyStore>()
    .UseSecretResolver<VaultSecretResolver>();
`,
};

/** The decoded token card in the hero. Standard claims only. */
export const sampleToken = {
  header: { alg: "ES256", typ: "at+jwt", kid: "7Qm…f3" },
  payload: {
    iss: "https://acme.id.example.com/",
    aud: "orders-api",
    sub: "u_01J9Z…",
    client_id: "orders-web",
    scope: "openid orders.read",
    exp: 1760000900,
  },
} as const;
