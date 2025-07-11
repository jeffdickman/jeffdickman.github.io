# Jeff Dickman - Personal Website

A personal website built with React and hosted on GitHub Pages.

## Hosting

This website is hosted on GitHub Pages at [https://jeffdickman.github.io/](https://jeffdickman.github.io/)

## Project Structure

- `/website/` - Contains the website files (index.html, script.js, styles.css)
- `LICENSE` - Project license
- `README.md` - Project documentation

## Deployment

1. Push changes to the `gh-pages` branch
2. GitHub Pages will automatically deploy the content
3. Website will be available at [https://jeffdickman.github.io/](https://jeffdickman.github.io/)

## Development

The website uses:
- HTML5
- CSS3
- JavaScript ES6+
- GitHub Pages for hosting

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
