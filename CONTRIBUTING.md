# Contributing to TaskMaster

Thank you for your interest in contributing to TaskMaster! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment.

## 🐛 Reporting Bugs

Before submitting a bug report:
1. Check if the bug has already been reported in Issues
2. Ensure you're using the latest version
3. Collect relevant information (browser, OS, error messages)

When submitting a bug report, include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please:
1. Check if the feature has been suggested
2. Provide clear use case
3. Explain why it would be useful
4. Consider implementation approach

## 🔧 Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup environment variables**
   - Copy `.env.example` files
   - Update with your values

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 📝 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Add screenshots if UI changes

## 🎨 Code Style Guidelines

### JavaScript/React
- Use ES6+ features
- Prefer functional components
- Use meaningful variable names
- Keep functions small and focused
- Add JSDoc comments for complex logic

**Example:**
```javascript
/**
 * Fetch tasks with optional filters
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} Array of tasks
 */
const fetchTasks = async (filters = {}) => {
  // Implementation
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use semantic class names

### File Structure
- One component per file
- Group related files
- Use index.js for exports
- Keep files under 300 lines

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] Authentication flow
- [ ] Task CRUD operations
- [ ] Search and filters
- [ ] Profile management
- [ ] Error handling
- [ ] Responsive design
- [ ] Browser compatibility

## 📚 Documentation

When contributing:
- Update README if needed
- Add JSDoc comments
- Update API documentation
- Include inline comments for complex logic

## 🚀 Deployment

Contributors don't need to worry about deployment. Maintainers handle:
- Reviewing PRs
- Merging to main
- Automated deployment
- Version tagging

## 🏆 Recognition

Contributors will be acknowledged in:
- README contributors section
- Release notes
- Project documentation

## ❓ Questions?

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Open a discussion
4. Contact maintainers

## 📋 Checklist Before Submitting PR

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console logs/warnings
- [ ] Tested on multiple browsers
- [ ] Responsive design verified
- [ ] Commit messages follow convention
- [ ] PR description is clear

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🎉**

