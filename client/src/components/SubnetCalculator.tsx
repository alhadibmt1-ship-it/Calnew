import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.1");
  const [maskBits, setMaskBits] = useState("24");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    // Basic validation
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      alert("Invalid IP Address");
      return;
    }

    const mask = parseInt(maskBits);
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    
    // Calculate mask
    const maskNum = -1 << (32 - mask);
    
    // Network address
    const networkNum = ipNum & maskNum;
    const network = [
      (networkNum >>> 24) & 255,
      (networkNum >>> 16) & 255,
      (networkNum >>> 8) & 255,
      networkNum & 255
    ].join('.');

    // Broadcast address
    const broadcastNum = networkNum | (~maskNum);
    const broadcast = [
      (broadcastNum >>> 24) & 255,
      (broadcastNum >>> 16) & 255,
      (broadcastNum >>> 8) & 255,
      broadcastNum & 255
    ].join('.');

    // Host range
    const firstHostNum = networkNum + 1;
    const lastHostNum = broadcastNum - 1;
    
    const firstHost = [
      (firstHostNum >>> 24) & 255,
      (firstHostNum >>> 16) & 255,
      (firstHostNum >>> 8) & 255,
      firstHostNum & 255
    ].join('.');

    const lastHost = [
      (lastHostNum >>> 24) & 255,
      (lastHostNum >>> 16) & 255,
      (lastHostNum >>> 8) & 255,
      lastHostNum & 255
    ].join('.');

    // Number of hosts
    const numHosts = Math.pow(2, 32 - mask) - 2;
    
    // Subnet Mask string
    const maskStr = [
      (maskNum >>> 24) & 255,
      (maskNum >>> 16) & 255,
      (maskNum >>> 8) & 255,
      maskNum & 255
    ].join('.');

    setResult({
      network,
      broadcast,
      firstHost,
      lastHost,
      numHosts: numHosts > 0 ? numHosts : 0,
      maskStr,
      cidr: `/${mask}`,
      ipType: getIpClass(parts[0])
    });
  };

  const getIpClass = (firstOctet: number) => {
    if (firstOctet < 128) return "Class A";
    if (firstOctet < 192) return "Class B";
    if (firstOctet < 224) return "Class C";
    if (firstOctet < 240) return "Class D (Multicast)";
    return "Class E (Experimental)";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Subnet Calculator</CardTitle>
        <CardDescription>Calculate network mask, broadcast address, and usable host range.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-[2fr,1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>IP Address</Label>
            <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="e.g., 192.168.1.1" />
          </div>
          <div className="space-y-2">
            <Label>Subnet Mask (CIDR)</Label>
            <Select value={maskBits} onValueChange={setMaskBits}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {[...Array(31)].map((_, i) => {
                  const bit = 32 - i;
                  return (
                    <SelectItem key={bit} value={bit.toString()}>
                      /{bit}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="grid gap-4 md:grid-cols-2 animate-in fade-in-50">
            <div className="space-y-1 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground uppercase">Network Address</p>
              <p className="font-mono text-lg">{result.network}</p>
            </div>
            <div className="space-y-1 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground uppercase">Broadcast Address</p>
              <p className="font-mono text-lg">{result.broadcast}</p>
            </div>
            <div className="space-y-1 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground uppercase">Subnet Mask</p>
              <p className="font-mono text-lg">{result.maskStr}</p>
            </div>
            <div className="space-y-1 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground uppercase">Usable Hosts</p>
              <p className="font-mono text-lg">{result.numHosts.toLocaleString()}</p>
            </div>
            <div className="space-y-1 p-3 bg-muted rounded-md md:col-span-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">Host Range</p>
              <div className="flex items-center gap-2 font-mono text-lg">
                <span>{result.firstHost}</span>
                <span className="text-muted-foreground">-</span>
                <span>{result.lastHost}</span>
              </div>
            </div>
             <div className="space-y-1 p-3 bg-muted rounded-md md:col-span-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">Details</p>
              <p className="text-sm text-muted-foreground">
                {result.cidr} is a {result.ipType} network.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}