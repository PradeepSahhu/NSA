"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePacket = parsePacket;
const buffer_1 = require("buffer");
function parsePacket(json) {
    try {
        // EK output has 2 JSON lines:
        // {"index":...}
        // {"timestamp":...}
        const packet = JSON.parse(json);
        if (!packet.layers)
            return null;
        const layers = packet.layers;
        const ip = layers.ip ?? layers.ipv6;
        if (!ip)
            return null;
        let protocol = "unknown";
        if (layers.http)
            protocol = "http";
        else if (layers.tls)
            protocol = "https";
        else if (layers.dns)
            protocol = "dns";
        else if (layers.resp)
            protocol = "redis";
        else if (layers.tcp)
            protocol = "tcp";
        else if (layers.udp)
            protocol = "udp";
        let srcPort = 0;
        let dstPort = 0;
        let payloadHex = null;
        if (layers.tcp) {
            srcPort = Number(layers.tcp.tcp_tcp_srcport);
            dstPort = Number(layers.tcp.tcp_tcp_dstport);
            payloadHex = layers.tcp.tcp_tcp_payload ?? null;
        }
        if (layers.udp) {
            srcPort = Number(layers.udp.udp_udp_srcport);
            dstPort = Number(layers.udp.udp_udp_dstport);
            payloadHex = layers.udp.udp_udp_payload ?? null;
        }
        let payloadText = null;
        if (payloadHex) {
            try {
                payloadText = buffer_1.Buffer
                    .from(payloadHex.replace(/:/g, ""), "hex")
                    .toString("utf8");
            }
            catch {
                payloadText = null;
            }
        }
        let hostname = null;
        if (layers.http?.http_http_host)
            hostname = layers.http.http_http_host;
        else if (layers.tls?.tls_tls_handshake_extensions_server_name)
            hostname = layers.tls.tls_tls_handshake_extensions_server_name;
        else if (layers.dns?.dns_dns_qry_name)
            hostname = layers.dns.dns_dns_qry_name;
        return {
            timestamp: layers.frame?.frame_frame_time ??
                new Date().toISOString(),
            protocol,
            srcIP: ip.ip_ip_src,
            dstIP: ip.ip_ip_dst,
            srcPort,
            dstPort,
            hostname,
            payloadHex,
            payloadText,
            packetLength: Number(layers.frame?.frame_frame_len ?? 0)
        };
    }
    catch {
        return null;
    }
}
