// Process-local guard: a forbidden call throws before a socket or request is created.
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import tls from 'node:tls';
import dgram from 'node:dgram';

const deny = () => { throw new Error('FACET_SYNTHETIC_NETWORK_FORBIDDEN'); };
globalThis.fetch = deny;
http.request = deny;
http.get = deny;
https.request = deny;
https.get = deny;
net.connect = deny;
net.createConnection = deny;
net.Socket.prototype.connect = deny;
tls.connect = deny;
dgram.createSocket = deny;
globalThis.__facetSyntheticNetworkDenied = true;

await import('./proof.test.mjs');
