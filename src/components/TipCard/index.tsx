import React, {FC} from "react";
import TipCardEditable from "./CardEditable";
import TipCardNonEditable from "./CardNonEditable";
import {SortableContainer, SortableContainerProps, SortableElement, SortableElementProps} from "react-sortable-hoc";
import {TipData} from "../../containers/GoalTips";
export interface TipCardData {
    title: string;
    explanation: string;
}
export interface TipCardProps extends SortableElementProps{
    editable: boolean;
    cardData: TipCardData;
    onEdit: () => void;
    onCancel: () => void;
    onSave: (tipData: TipCardData) => void;
    onTipRemove: () => void
}

type emptyFunction = () => void
type tipSaveFunction = (i:number, tipData: TipCardData, id: string) => void
type indexFunction =  (i: number) => void;
type  cancelFunction =  (i: number, id: string) => void;
type EditableFunction = (i: number, editable: boolean) => void
export interface SortableTipCardsProps extends SortableContainerProps {
    items: TipData[];
    onEdit: EditableFunction | emptyFunction;
    onTipSave:  tipSaveFunction | emptyFunction;
    onRemove:  indexFunction | emptyFunction;
    onCancel: cancelFunction | emptyFunction;
}

const TipCard = SortableElement(({editable, cardData, onEdit, onCancel, onSave, onTipRemove}: TipCardProps) => {
    return (
        editable ? <TipCardEditable onSave={onSave} onCancel={onCancel} cardData={cardData}  /> : <TipCardNonEditable onRemove={onTipRemove} onEdit={onEdit} cardData={cardData} />
    )
})

const SortableTipContainer = SortableContainer(({items, onRemove, onCancel, onEdit, onTipSave }: SortableTipCardsProps) => {
    return (
        <div>

            {items.map((item, index) => <TipCard index={index} onTipRemove={() => {onRemove(index)}} onSave={(tipData) => {onTipSave(index, tipData, (item.id || ""))}} onCancel={() => onCancel(index, (item.id || ""))} key={`key-${item.id}-${item.editable}`} onEdit={() => {onEdit(index, true)}} editable={!!item.editable} cardData={item} />)}

        </div>
    )
});






export {
    TipCard,
    SortableTipContainer
}
