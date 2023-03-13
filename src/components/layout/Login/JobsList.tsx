import React from 'react';
import {CourierViewEntity} from 'types';
import {JobsListRow} from "./JobsListRow";
import './JobsList.css';

interface Props {
    jobs: CourierViewEntity[];
    onJobsChange: () => void;
}

export const JobsList = (props: Props) => (
    <table>
        <thead>
        <tr>
            <th>Job number</th>
            <th>Pick up</th>
            <th>Pick up code</th>
            <th>Drop off/middle stop</th>
            <th>Drop off/middle stop code</th>
            <th>Drop off</th>
            <th>Drop off code</th>
            <th>Points</th>
            <th>Penalties</th>
            <th>Finished</th>
        </tr>
        </thead>
        <tbody>
        {
            props.jobs.map((job => (
                <JobsListRow job={job} key={job.jobId} onJobsChange={props.onJobsChange}/>
            )))
        }

        </tbody>

    </table>
)