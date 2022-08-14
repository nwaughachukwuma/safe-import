import test from 'ava'
import safeImport from '../lib/index.js'

test('check import', async (t) => {
    const indexFile = await safeImport('../lib/index.js', {onlyDefault: true})
    
    t.is(indexFile, safeImport)
    t.is(indexFile.name, safeImport.name)
})

test('check default and named import', async (t) => {
    const indexFile = await safeImport('../test/namedFunction.js', {onlyDefault: false})
    
    t.not(indexFile.namedFunction, undefined)
    t.is(indexFile.namedFunction.name, 'namedFunction')

    t.not(indexFile.default, undefined)
    t.is(indexFile.default.name, 'namedFunction')
})

test('only default import', async (t) => {
    const indexFile = await safeImport('../test/namedFunction.js', {onlyDefault: true})
    
    t.not(indexFile, undefined)
    t.is(indexFile.name, 'namedFunction')
    t.is(indexFile.namedFunction, undefined)
})

test('only named import', async (t) => {
    const indexFile = await safeImport('../test/namedFunction2.js')
    
    t.is(indexFile.default, undefined)
    t.not(indexFile.namedFunction2, undefined)
    t.is(indexFile.namedFunction2.name, 'namedFunction2')
})

test('safely import cjs file', async (t) => {
    const indexFile = await safeImport('../test/namedFunction.cjs')
    
    t.not(indexFile.default, undefined)
    t.is(indexFile.default.name, 'namedFunction')
    t.is(indexFile.namedFunction, undefined)
})

test('safely import cjs file, default only', async (t) => {
    const indexFile = await safeImport('../test/namedFunction.cjs', {onlyDefault: true})
    
    t.not(indexFile, undefined)
    t.is(indexFile.name, 'namedFunction')
    t.is(indexFile.namedFunction, undefined)
})