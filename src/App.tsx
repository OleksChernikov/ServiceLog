import { ServiceLogForm } from './features/serviceLogs/components/ServiceLogsForm';
import { ServiceLogsTable } from './features/serviceLogs/components/ServiceLogsTable';
import './App.css';

function App() {
  return (
    <>
      <ServiceLogForm />
      <ServiceLogsTable />
    </>
  );
}

export default App;