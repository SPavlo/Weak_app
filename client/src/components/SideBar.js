import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const SideBar = observer(({select}) => {
    const {box} = useContext(Context)

    return (
        <ListGroup className="mt-5">
            {box.types.map(type =>
                <ListGroup.Item

                    style={{cursor:"pointer"}}
                    active={type.id === box.selectedType.id}
                    key={type.id}
                    onClick={() => {
                        select(type)
                        box.setSelectedType(type)
                    }}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SideBar;