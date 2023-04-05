import React from 'react';
import {CourierViewEntity} from 'types';
import {JobsListRow} from "./JobsListRow";
import './JobsList.css';

interface Props {
    jobs: CourierViewEntity[];
    onJobsChange: () => void;
}

export const UnfinishedJobs = (props: Props) => {

    const unfinishedJobs = props.jobs.filter(job => job.finishedJob === 0)
        .map(job =>
            <JobsListRow
                job={job}
                key={job.id}
                codeA={job.cp_a_code}
                codeB={job.cp_b_code}
                id={job.id}
                finishedA={job.finishedA}
                finishedB={job.finishedB}
                onJobsChange={props.onJobsChange}
            />
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
            {unfinishedJobs}
            </tbody>

        </table>
    )
}