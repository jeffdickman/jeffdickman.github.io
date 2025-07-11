# Jeff Dickman - Personal Website

A personal website built with React and hosted on AWS using Terraform for infrastructure management.

## Infrastructure

This project uses Terraform to manage AWS infrastructure including:
- S3 bucket for website assets
- CloudFront distribution for CDN
- Lambda function for API backend
- IAM roles and policies

## Prerequisites

1. Install Terraform (v1.12.x or higher)
2. Configure AWS credentials
3. Install AWS CLI

## Deployment

1. Configure required variables in `variables.tf`:
   - `aws_region`: AWS region (currently set to us-west-2)
   - `website_bucket_name`: Name for S3 bucket
   - `website_assets_path`: Path to website assets
   - `lambda_runtime`: Lambda function runtime
   - `lambda_memory_size`: Lambda function memory size
   - `lambda_timeout`: Lambda function timeout
   - `mongodb_uri`: MongoDB connection string
   - `jwt_secret`: JWT secret for authentication
   - `cloudfront_logging_bucket`: Bucket for CloudFront logs
   - `cloudfront_logging_prefix`: Prefix for CloudFront logs

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Review the plan:
   ```bash
   terraform plan
   ```

4. Apply the configuration:
   ```bash
   terraform apply
   ```

## Documentation References

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Bucket Object Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object)
- [AWS IAM Policy Documentation](https://developer.hashicorp.com/terraform/tutorials/aws/aws-iam-policy)
- [Terraform Configuration Language](https://developer.hashicorp.com/terraform/language)

## Security

- S3 bucket policy uses AWS CloudFront Origin Access Identity for secure access
- Lambda function has restricted IAM permissions
- Environment variables are used for sensitive configuration
- CloudFront distribution uses HTTPS with default certificate

## Project Structure

```
personal-website/
├── frontend/         # Website frontend code
│   ├── index.html   # Main HTML file
│   ├── styles.css   # Global styles
│   └── script.js    # Frontend JavaScript
├── backend/          # Backend server code
│   ├── .env         # Environment variables
│   ├── handler.js   # Lambda handler
│   ├── serverless.yml # Serverless configuration
│   └── package.json # Backend dependencies
├── terraform/        # Infrastructure as Code
│   ├── main.tf      # Main Terraform configuration
│   ├── variables.tf # Terraform variables
│   └── outputs.tf   # Terraform outputs
└── README.md        # Project documentation
```

## Features

- Clean and modern design
- Responsive layout for all devices
- Interactive typing animation
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Contact form
- Social media integration

## Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari)
- Node.js (for backend development)
- AWS CLI configured with appropriate permissions
- MongoDB Atlas account for database

### Local Development Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `index.html` in your web browser

6. Customize the content:
   - Personal information in `index.html`
   - Social media links in the hero section
   - Projects in the projects section

### Infrastructure Deployment with Terraform

1. Install Terraform:
   ```bash
   brew install terraform
   ```

2. Configure AWS credentials:
   ```bash
   aws configure
   ```

3. Initialize Terraform:
   ```bash
   cd terraform
   terraform init
   ```

4. Create a `terraform.tfvars` file:
   ```
   aws_region = "us-east-1"
   website_domain_name = "your-domain.com"  # Optional
   website_bucket_name = "personal-website-assets"
   mongodb_uri = "your-mongodb-uri"
   jwt_secret = "your-jwt-secret"
   website_assets_path = "frontend/"
   ```

5. Plan and Apply:
   ```bash
   terraform plan
   terraform apply
   ```

6. After deployment, the infrastructure will include:
   - S3 bucket for website assets
   - Lambda function for API
   - API Gateway
   - CloudFront distribution
   - (Optional) Route53 domain configuration
   - SSL certificate (if using custom domain)

7. Access your website at:
   ```
   https://<cloudfront-domain>
   ```

8. Access your API at:
   ```
   https://<api-gateway-domain>/api/
   ```

## Development Guidelines

### Coding Standards
- HTML:
  - Use semantic HTML5 elements
  - Maintain consistent indentation (2 spaces)
  - Keep classes and IDs lowercase with hyphens

- CSS:
  - Use BEM naming convention
  - Organize properties alphabetically
  - Use comments for complex styles

- JavaScript:
  - Use ES6+ syntax
  - Follow camelCase for variables and functions
  - Use strict mode

### File Organization
- Keep related files together
- Use descriptive filenames
- Maintain consistent file extensions
- Place all styles in `styles.css`
- Keep JavaScript in `script.js`

## Customization

1. Content Updates:
   - Edit `index.html` for personal information
   - Update `styles.css` for styling changes
   - Modify animations in `script.js`

2. Color Scheme:
   - Primary colors are defined in `styles.css`
   - Use CSS variables for consistent theming

3. Animations:
   - All animations are in `script.js`
   - Use CSS transitions for simple effects
   - Keep animations smooth and performant

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Font Awesome Icons

- Backend:
  - Node.js
  - Express.js
  - Environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Maintainer

Jeff Dickman
- Email: [jeff@jeffdickman.com](mailto:jeff@jeffdickman.com)
- LinkedIn: [jeffdickman](https://www.linkedin.com/in/jeffdickman/)
- GitHub: [jeffdickman](https://github.com/jeffdickman/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
