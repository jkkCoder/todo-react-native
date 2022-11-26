import "react-native"
import React from "react"
import Header from "../components/Header"
import renderer from "react-test-renderer"

test("Header snapshot",()=>{
    const snap = renderer.create(<Header />).toJSON();
    expect(snap).toMatchSnapshot();
})