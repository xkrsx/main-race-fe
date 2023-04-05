import React from 'react';
import {CourierViewEntity} from 'types';
import {JobsListRow} from "./JobsListRow";
import './JobsList.css';

interface Props {
    jobs: CourierViewEntity[];
    onJobsChange: () => void;
}

export const FinishedJobs = (props: Props) => {

    const finishedJobs = props.jobs.filter(job => job.finishedJob === 1)
        .map(job =>
            <JobsListRow job={job} key={job.id}
                         onJobsChange={props.onJobsChange}/>
        )

    return (<table>
            <thead>
            <tr>
                <th>Job number</th>
                <th>Pick up</th>
                <th>Code</th>
                <th>Drop off</th>
                <th>Code</th>
                {/*<th>Extra stop</th>*/}
                {/*<th>Code</th>*/}
                <th>Points</th>
                <th>Penalties</th>
            </tr>
            </thead>
            <tbody>
            {finishedJobs}
            </tbody>

        </table>
    )
}