import {Category} from "types";

interface Props {
    courierId: string;
    number: number;
    name: string;
    category: Category;
    points: number;
    penalties: number;
}

export const ResultsListRow = (props: Props) => <tr key={props.courierId}>
    <td>{props.number}</td>
    <td>{props.name}</td>
    <td>{props.category}</td>
    <td>{props.points}</td>
    <td>{props.penalties}</td>
    <td>{props.points - props.penalties}</td>
</tr>