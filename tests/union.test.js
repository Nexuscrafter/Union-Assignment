import Union from '../Union.js';

test('test1', () => {
    expect(Union([1, 2, 3], [2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
});

test('test2', () => {
    expect(Union([1, 4, true, {a:{b:10}},'',{}], [4, 5, 6, true, {a:{b:10}},'',{}])).toStrictEqual([1, 4, true, {a:{b:10}},'',{}, 5, 6]);
});

test('test3', () => {
    expect(Union([1, []], [[], 1, '1'])).toStrictEqual([1, [], '1']);
});
test('test4', () => {
    const input1 = [ 
        {
            b: 10,
            c: {
                z: {
                    t: 5,
                    _t: 5
                },
                f: [4]
            }
        },
        2
    ];
    
    const input2 = [
        {
            b: 10,
            c: {
                z: {
                    t: 5,
                    _t: 5
                },
                f: [4]
            }
        },
        '2'
    ];

    const expectedOutput = [
        {
            b: 10,
            c: {
                z: {
                    t: 5,
                    _t: 5
                },
                f: [4]
            }
        },
        2,
        '2'
    ];
    expect(Union(input1, input2)).toStrictEqual(expectedOutput);
}); 
