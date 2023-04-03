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
            <th>Code</th>
            <th>Drop off</th>
            <th>Code</th>
            <th>Extra stop</th>
            <th>Code</th>
            <th>Points</th>
            <th>Penalties</th>
        </tr>
        </thead>
        <tbody>{
            props.jobs.map((job => (
                <JobsListRow job={job} key={job.id} onJobsChange={props.onJobsChange}/>
            )))
        }
        </tbody>

    </table>
)