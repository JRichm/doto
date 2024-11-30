"use client"
import React, { useState } from "react";

interface ListProps {
    listName: string;
    items: {
        itemName: string;
        itemDate: string;
        itemComplete: boolean;
    }[]
}

interface ListItemProps {
    itemName: string;
    itemDate: string;
    itemComplete: boolean;
    onCheckboxChange: (isChecked: boolean) => void;
}

interface NewItemMenuProps {
    listName: string;
    closeMenu: () => void;
}

const ListItem: React.FC<ListItemProps> = ({  itemName, itemDate, itemComplete, onCheckboxChange }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(e.target.checked)
    }

    return (
        <li className="flex flex-row p-1">
            <input type="checkbox" className="mr-1" checked={itemComplete} onChange={handleCheckboxChange}></input>
            <div className="flex flex-row w-full justify-between">
                <p className="m-1" style={{ textDecoration: itemComplete ? "line-through" : "none"}}>{ itemName }</p>
                <p className="text-sm text-gray-500 self-center">{ itemDate }</p>
            </div>
        </li>
    )
}

const NewItemMenu: React.FC<NewItemMenuProps> = ({ listName, closeMenu }) => {
    return (
        //containing div, maybe add blur?
        <div className="absolute top-0 left-0 w-full h-full p-2"> 
            <div className="backdrop-blur-sm z-10 w-full h-full p-2 flex flex-col pt-10">
                <div className="bg-white p-2 rounded-md">
                    <div className="flex flex-row justify-between py-1">
                        <p className="font-semibold tracking-wider">New {listName} item</p>
                        <button className="bg-red-600 text-white rounded-full aspect-square h-5 text-[12px] m-0 p-0 self-center" onClick={closeMenu}>X</button>
                    </div>
                    <hr className="border-black"></hr>
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex flex-row justify-between">
                            <p className="w-1/4">Name</p>
                            <input className="border-b w-full text-right" placeholder="Groceries"></input>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="w-1/4">Date</p>
                            <input className="border-b w-full text-right" placeholder="01/01/2024"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const List: React.FC<ListProps> = ({ listName, items }) => {
    const [listItems, setListItems] = useState(items)
    const [menuToggled, toggleMenu] = useState(false)

    const onUpdate = (index: number, isChecked: boolean) => {
        const updatedItems = [...listItems];
        updatedItems[index].itemComplete = isChecked;
        setListItems(updatedItems)
    }

    const openMenu = () => {
        toggleMenu(true)
    }

    const closeMenu = () => {
        toggleMenu(false)
    }

    return (
        <div className="bg-slate-100 p-2 min-w-96 h-fit relative">
            { menuToggled && <NewItemMenu listName={listName} closeMenu={ closeMenu } />}
            <div className="bg-slate-200 p-2">
                <div className="flex flex-row justify-between my-1">
                    <h1 className="font-semibold tracking-wider">{ listName }</h1>
                    <button className="bg-blue-500 text-white px-2 rounded-md" onClick={openMenu}>New</button>
                </div>
                <hr className="border-slate-500"></hr>
                <ul>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            itemName={item.itemName}
                            itemDate={item.itemDate}
                            itemComplete={item.itemComplete}
                            onCheckboxChange={(isChecked: boolean) => onUpdate(index, isChecked)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List;