import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./associate.state";
import { addAssociate, addAssociateSuccess, deleteAssociate, getAssociateSuccess, loadAssociateFail, loadAssociateSuccess, openPopup, updateAssociateSuccess } from "./associate.action";


export const _associateReducer = createReducer(AssociateState,
    //Load Associate Success Reducer
    on(loadAssociateSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    //Load Associate Fail Reducer
    on(loadAssociateFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    //Get Associate Success Reducer
    on(getAssociateSuccess, (state, action) => {
        return {
            ...state,
            associateObj: action.obj,
            errormessage: ''
        }
    }),
    //Add Associate Success Reducer
    on(addAssociateSuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newData = { ...action.inputdata };
        _newData.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newData],
            errormessage: ''
        }
    }),
    //Update Associate Success Reducer
    on(updateAssociateSuccess, (state, action) => {
        const _associate = { ...action.updateData }
        const _data = state.list.map((res) => {
            return res.id === _associate.id ? _associate : res
        })
        return {
            ...state,
            list: _data,
            errormessage: ''
        }
    }),
    //Delete Associate Success Reducer
    on(deleteAssociate, (state, action) => {
        const _data = state.list.filter((res) => {
            return res.id !== action.id
        })
        return {
            ...state,
            list: _data,
            errormessage: ''
        }
    }),
    //Open Popup Reducer
    on(openPopup, (state, action) => {
        return {
            ...state,
            associateObj: {
                id: 0,
                name: "",
                email: "",
                phone: "",
                address: "",
                type: "customer",
                associategroup: "level1",
                status: true
            }
        }
    })
);

export function AssociateReducer(state: any, action: any) {
    return _associateReducer(state, action);
}