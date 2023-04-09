import {CourierViewEntity, SimpleCourierEntity} from "types";
import React, {FormEvent, useEffect, useState} from "react";
import {Spinner} from "../components/layout/common/Spinner/Spinner";
import "./AccessView.css";
import {AccessPanel} from "../components/layout/AccessPanel/AccessPanel";

export const AccessView = () => (
    <div className="jobs-wrapper">
        <AccessPanel/></div>
)
