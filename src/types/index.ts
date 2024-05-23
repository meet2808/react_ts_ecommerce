import { UseFormRegister } from "react-hook-form";

export type PRODUCT_CARD_PROP_TYPES = {
    img : string;
    title : string;
    price : number;
    productId ?: number;
};

export type FOOTER_LINK_TYPES = {
    link : string;
    label : string;
}[]

export type ITEM_TYPE = {
    link : string;
    label : string;
}

export type HERO_CARD_TYPES = {
    img : string;
    title : string;
    routeLink : string;
    imgTitle : string;
}

export type CATEGORY_LIST_TYPES = {
    label : string;
    link : string;
    category : string;
}

export type IData = {
    name : string;
    email : string;
    pw : string;
    cp : string;
}

export type LData = {
    email : string;
    pw : string;
}

export type IType = {
    type : string;
    label : string;
    errors : string;
    required ?: boolean;
    placeholder : string;
    hasError : boolean;
    fullWidth ?: boolean;
    value : string;
    register : UseFormRegister<IData>
}

export type DROPDOWN_ITEMS_TYPE = {
    id : number;
    name : string;
}[]

export type DROPDOWN_TYPE = {
    name : string;
    value : string;
    items : DROPDOWN_ITEMS_TYPE;
    label : string;
    errors : string;
    hasError : boolean;
}

export type SIGNUP_TYPE = {
    email : string;
    password : string;
    name : string;
}

export type USER_TYPE = {
    email : string;
    name : string;
    id : string;
}

export type PTYPE = {
    id : number;
    title : string;
    description : string;
    price : number;
    discountPercentage : number;
    rating : number;
    stock : number;
    brand : string;
    category : string;
    thumbnail : string;
    images : string[];
}[]