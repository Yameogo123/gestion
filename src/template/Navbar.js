import React, { useState } from 'react';
import { Drawer } from 'react-native-paper';

export default function Navbar() {

    const [active, setActive] = useState('');

    return (
        <Drawer.Section title="Some title" style={{position: "absolute", right: 5, top: 80, backgroundColor:"darkgreen"}}>
            <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    );
};