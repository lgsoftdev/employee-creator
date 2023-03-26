import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AddEmployeePage from './containers/AddEmployeePage';
import EditEmployeePage from './containers/EditEmployeePage';
import EmployeeListPage from './containers/EmployeeListPage';
import NotFoundPage from './containers/NotFoundPage';
import EmployeesProvider from './context/EmployeesProvider';

const App = () => {
  return (
    <div className="container mt-5">
      <h3>Employee Creator</h3>
      <EmployeesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/employee/add" element={<AddEmployeePage />} />
            <Route path="/employee/:id" element={<EditEmployeePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </EmployeesProvider>
      <footer className="d-flex flex-row-reverse text-muted small mt-3">
        <div>&nbsp;Copyright &copy; 2023 -&nbsp;</div>
        <div>&nbsp;by Lynn G</div>
        <div>
          &nbsp; Built with React TypeScript frontend and Java Spring RESTful
          API
        </div>
      </footer>
    </div>
  );
};

export default App;
