import React from 'react';
import { statuses } from '../../utilities';
import Stack from 'react-bootstrap/Stack';
import DashboardItem from './DashboardItem';

const Dashboard = ({ jobs, clients, categories, getJobs }) => {
  const todo = jobs.filter((job) => job.status == 'todo');
  const inProgress = jobs.filter((job) => job.status == 'in_progress');
  const needInfo = jobs.filter((job) => job.status == 'need_info');
  const signatures = jobs.filter((job) => job.status == 'need_signatures');
  const ready = jobs.filter((job) => job.status == statuses.indexOf('ready'));

  return (
    <Stack gap={3}>
      {todo.length > 0 &&
        <div className="p-2">
          <h3>Todo</h3>
          <DashboardItem jobs={todo} clients={clients} categories={categories} getJobs={getJobs} />
        </div>
      }
      {inProgress.length > 0 &&
        <div className="p-2">
          <h3>In Progress</h3>
          <DashboardItem jobs={inProgress} clients={clients} categories={categories} getJobs={getJobs} />
        </div>
      }
      {needInfo.length > 0 &&
        <div className="p-2">
          <h3>Need Info</h3>
          <DashboardItem jobs={needInfo} clients={clients} categories={categories} getJobs={getJobs} />
        </div>
      }
      {signatures.length > 0 &&
        <div className="p-2">
          <h3>Need Signatures</h3>
          <DashboardItem jobs={signatures} clients={clients} categories={categories} getJobs={getJobs} />
        </div>
      }
      {ready.length > 0 &&
        <div className="p-2">
          <h3>Ready to File</h3>
          <DashboardItem jobs={ready} clients={clients} categories={categories} getJobs={getJobs} />
        </div>
      }
    </Stack>
  )
};

export default Dashboard;