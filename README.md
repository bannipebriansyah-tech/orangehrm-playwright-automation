# OrangeHRM Playwright Automation

A comprehensive end-to-end testing framework for OrangeHRM using Playwright, featuring automated authentication, dashboard testing, and admin functionality validation.

## 🚀 Project Overview

This automation suite provides robust testing coverage for the OrangeHRM demo application, including:

- **Authentication Testing** - Login validation with various scenarios
- **Dashboard Testing** - Comprehensive widget and UI element verification
- **Admin Module Testing** - System Users management interface validation
- **Cross-browser Support** - Chrome, Firefox, and other browser compatibility
- **Parallel Execution** - Optimized test performance with parallel test runs

## 📋 Test Coverage

### Authentication Tests (`login.spec.js`)
- ✅ Valid login with correct credentials
- ✅ Login with invalid credentials
- ✅ Empty field validation
- ✅ UI element presence verification
- ✅ Error message validation

### Dashboard Tests (`dashboard.spec.js`)
- ✅ Time at Work widget verification
- ✅ My Actions widget validation
- ✅ Quick Launch functionality testing
- ✅ Buzz Latest Posts widget
- ✅ Employee distribution charts (by Sub Unit & Location)
- ✅ Employees on Leave Today widget

### Admin Tests (`admin.spec.js`)
- ✅ System Users page navigation
- ✅ Form field visibility and functionality
- ✅ Toggle button (collapse/expand) behavior
- ✅ Responsive design validation
- ✅ Form accessibility compliance

## 🛠️ Tech Stack

- **Playwright** - Modern web automation framework
- **Node.js** - JavaScript runtime environment
- **Chrome/Firefox** - Browser automation engines
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd orangehrm-playwright-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Environment Configuration (Optional)**
   Create a `.env` file in the project root for custom credentials:
   ```env
   USERNAME=your_username
   PASSWORD=your_password
   ```
   > **Note:** Default credentials (Admin/admin123) will be used if no `.env` file is provided.

## 🎯 Usage

### Running Tests

#### Run All Tests
```bash
npx playwright test
```

#### Run Specific Test Suites
```bash
# Authentication tests only
npx playwright test --project=login-tests

# Authenticated tests (Dashboard & Admin)
npx playwright test --project=authenticated-tests

# Specific test file
npx playwright test tests/dashboard.spec.js
```

#### Run Tests in Different Modes
```bash
# Run in headed mode (visible browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run with specific browser
npx playwright test --project=authenticated-tests --browser=firefox
```

### Test Reports
```bash
# Generate and view HTML report
npx playwright show-report
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.js`)

The project uses a sophisticated configuration with:

- **Parallel Execution**: 4 workers for optimal performance
- **Authentication State Management**: Automatic login state persistence
- **Multiple Browser Support**: Chrome and Firefox configurations
- **Test Isolation**: Separate projects for login and authenticated tests
- **Screenshots & Videos**: Automatic capture on failure
- **Trace Collection**: Detailed debugging information

### Global Setup (`global-setup.js`)

Automated authentication handling:
- Pre-authenticates before running tests
- Saves authentication state to `authState.json`
- Handles credential management via environment variables
- Provides error handling and debugging screenshots

## 🏗️ Project Structure

```
orangehrm-playwright-automation/
├── tests/
│   ├── login.spec.js          # Authentication tests
│   ├── dashboard.spec.js      # Dashboard functionality tests
│   └── admin.spec.js          # Admin module tests
├── global-setup.js            # Authentication setup
├── playwright.config.js       # Playwright configuration
├── package.json               # Dependencies and scripts
├── authState.json             # Saved authentication state
└── README.md                  # This file
```

## 🧪 Test Architecture

### Page Object Model
Each test suite implements the Page Object Model pattern:

- **LoginPage Class** - Handles authentication interactions
- **DashboardPage Class** - Manages dashboard widget testing
- **AdminPage Class** - Controls admin interface testing

### Test Data Management
- Environment-based configuration
- Centralized test data objects
- Flexible credential management

### Locator Strategy
- Robust element selection using multiple strategies
- Comprehensive locator collections for maintainability
- Wait strategies for dynamic content

## 📊 Test Execution Flow

1. **Global Setup** - Authenticates and saves session state
2. **Login Tests** - Validates authentication scenarios
3. **Authenticated Tests** - Runs dashboard and admin tests using saved state
4. **Reporting** - Generates comprehensive test reports

## 🔧 Advanced Usage

### CI/CD Integration
```bash
# Run tests in CI environment
npx playwright test --reporter=github

# Generate JUnit XML for CI systems
npx playwright test --reporter=junit
```

### Custom Test Execution
```bash
# Run specific test cases
npx playwright test --grep "TC001"

# Run tests with custom timeout
npx playwright test --timeout=60000

# Run in specific viewport
npx playwright test --viewport-size=1920,1080
```

## 🐛 Debugging

### Debug Mode
```bash
# Interactive debugging
npx playwright test --debug

# Debug specific test
npx playwright test tests/dashboard.spec.js --debug
```

### Trace Viewer
```bash
# View detailed execution traces
npx playwright show-trace test-results/trace.zip
```

### Screenshots & Videos
- Automatic screenshots on test failure
- Video recordings for debugging
- Error screenshots in global setup

## 📈 Performance Optimization

- **Parallel Execution**: 4 workers for faster test runs
- **Authentication Caching**: Reuses login state across tests
- **Selective Test Running**: Run only necessary test suites
- **Browser Reuse**: Efficient browser context management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests following the existing patterns
4. Ensure all tests pass
5. Submit a pull request

### Adding New Tests

1. **Create Test File**: Add new `.spec.js` file in `tests/` directory
2. **Implement Page Object**: Create corresponding page class
3. **Add Test Cases**: Follow existing naming conventions (e.g., `FEATURE-TC001`)
4. **Update Configuration**: Add any new test projects to `playwright.config.js`

## 📝 Test Naming Convention

- **Authentication**: `LOGIN-TC001`, `LOGIN-TC002`, etc.
- **Dashboard**: `DASHBOARD-TC001`, `DASHBOARD-TC002`, etc.
- **Admin**: `ADMIN-TC001`, `ADMIN-TC002`, etc.

## 🚨 Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Check internet connection
   - Verify OrangeHRM demo site accessibility
   - Confirm credentials in `.env` file

2. **Element Not Found**
   - Check if OrangeHRM interface has changed
   - Verify locators in page objects
   - Increase timeout values if needed

3. **Browser Issues**
   - Reinstall Playwright browsers: `npx playwright install`
   - Check browser compatibility
   - Verify system requirements

### Getting Help

- Check test reports for detailed error information
- Review screenshots and videos in `test-results/`
- Use trace viewer for step-by-step debugging
- Enable verbose logging: `npx playwright test --reporter=line`

## 📄 License

This project is licensed under the ISC License.

## 🎯 Future Enhancements

- [ ] Add more browser support (Safari, Edge)
- [ ] Implement API testing integration
- [ ] Add performance testing capabilities
- [ ] Create test data management system
- [ ] Add visual regression testing
- [ ] Implement parallel test execution across multiple environments

---

**Happy Testing! 🎉**

For questions or support, please create an issue in the repository.
