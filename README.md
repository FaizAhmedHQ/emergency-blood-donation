# Emergency Blood & Organ Availability Network

A full-stack application designed to connect donors, hospitals, and medical professionals in real-time to ensure life-saving blood and organ donations reach patients in critical need.

## 🚀 Features

### Backend (Spring Boot)
- JWT-based authentication with refresh tokens
- Role-based access control (Donor, Hospital, Admin)
- MongoDB with geospatial indexing for location-based matching
- Rate limiting for API endpoints
- Caching for improved performance
- Audit logging for security compliance
- Comprehensive error handling
- Pagination and sorting for all list endpoints
- Aggregation pipelines for analytics

### Frontend (React)
- Responsive design with TailwindCSS
- Modern UI with glassmorphism effects
- Framer Motion animations
- Dark/light mode toggle
- Real-time dashboard for each role
- Interactive charts with Recharts
- Form validation and error handling

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3+
- Spring Security
- Spring Data MongoDB
- JWT Authentication
- MapStruct for DTO mapping
- Lombok for boilerplate reduction
- Bucket4j for rate limiting
- SpringDoc OpenAPI (Swagger)

### Frontend
- React 18 with Vite
- TailwindCSS for styling
- Framer Motion for animations
- React Router DOM for navigation
- Axios for API calls
- React Toastify for notifications
- Recharts for data visualization
- Lucide Icons for UI icons

### Database
- MongoDB with geospatial indexing

## 📋 Prerequisites

- Java 17
- Maven 3.8+
- Node.js 18+
- MongoDB 5.0+

## 🚀 Getting Started

### Backend Setup

1. Clone the repository
```bash
git clone <repository-url>
cd blood-network/backend
```

2. Configure MongoDB connection in `application.yml`:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/blood_network_db
```

3. Run the application:
```bash
mvn spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔐 Authentication Flow

The application implements JWT-based authentication with refresh tokens:

1. User registers/login to get access and refresh tokens
2. Access token is used for API requests
3. When access token expires, refresh token is used to get a new one
4. If refresh token is expired, user needs to login again

## 🏗️ System Architecture

### Database Collections
- `users`: User accounts with roles and verification status
- `donorProfiles`: Donor-specific information with geospatial indexing
- `hospitalProfiles`: Hospital information with geospatial indexing
- `emergencyRequests`: Emergency requests from hospitals
- `donationRecords`: Historical donation records
- `refreshTokens`: Refresh tokens for authentication
- `auditLogs`: Audit logs for compliance and security

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

#### Donor
- `GET /api/donor/profile` - Get donor profile
- `PUT /api/donor/profile` - Update donor profile
- `PUT /api/donor/availability` - Update availability status
- `GET /api/donor/nearby-requests` - Get nearby emergency requests with pagination

#### Hospital
- `POST /api/hospital/request` - Create emergency request (rate limited)
- `GET /api/hospital/requests` - Get hospital requests with pagination
- `GET /api/hospital/matching-donors/{requestId}` - Get matching donors for request

#### Admin
- `GET /api/admin/users` - Get all users with pagination
- `PUT /api/admin/verify-user` - Verify user
- `GET /api/admin/analytics` - Get system analytics
- `GET /api/admin/logs` - Get audit logs with pagination

## 📊 Analytics and Reporting

The admin dashboard provides comprehensive analytics including:
- Blood group distribution
- Monthly donation trends
- Request status counts
- Total donors and hospitals
- Geographic distribution of donors

## 🔒 Security Features

- Passwords are hashed using BCrypt
- JWT tokens with configurable expiration
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Role-based access control
- Audit logging for security events

## 🗺️ Geospatial Features

The application leverages MongoDB's geospatial capabilities:
- 2dsphere indexes for location-based queries
- Efficient donor matching based on proximity
- Radius-based search for emergency requests
- Optimized geoNear queries

## 🧪 Testing

To run the application tests:
```bash
mvn test
```

## 🚢 Deployment

### Environment Variables
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_REFRESH_SECRET`: Secret key for refresh token signing
- `MONGO_URI`: MongoDB connection string

### Production Build
Backend:
```bash
mvn clean package -DskipTests
java -jar target/blood-network-0.0.1-SNAPSHOT.jar
```

Frontend:
```bash
npm run build
```

## 📖 API Documentation

API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- Real-time notifications with WebSockets
- SMS/email notifications for urgent requests
- Integration with mapping services for better location features
- Advanced analytics and reporting
- Mobile application development
- Multi-language support
- Enhanced security features